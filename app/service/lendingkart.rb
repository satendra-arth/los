# frozen_string_literal: true

class Lendingkart < Base
  attr_reader :user, :loan

  def perform(mobile)
    @user = CustomerInfo.find_by(mobile: mobile)
    partner = Partner.find_by(code: user.partner_code)
    @loan = LoanProfile.find_or_create_by(customer_info_id: @user.id, lender_code: "LENDINGKART", mobile: user.mobile, partner_id: partner.id, partner_code: partner.code)
    lead_creation unless dedupe_check
  end

  def dedupe_check
    endpoint = "/lead-exists-status"
    response = post(endpoint, dedupe_payload, headers)
    if response["leadExists"]
      loan.update(response: response, status: "REJECTED", rejection_reason: "Duplicate Lead", name: user.full_name, message: "Duplicate Lead")
      true
    else
      response["leadExists"]
    end
  end

  def lead_creation
    endpoint = "/create-application"
    response = post(endpoint, lead_creation_payload, headers)
    if response["message"] == "ELIGIBLE"
      loan.update(response: response, status: response["message"], external_loan_id: response["applicationId"], name: user.full_name)
    else
      loan.update(response: response, rejection_reason: response["message"], status: "INELIGIBLE", message: response["message"], name: user.full_name)
    end
  end

  def fetch_status(application_id)
    endpoint = "/applicationStatus/#{application_id}"
    response = get(endpoint, headers, nil)

    return unless response && response["applicationStatus"].present?

    data = LoanProfile.find_by(external_loan_id: application_id)

    status = if ["Application in Progress", "Application under Evaluation", "Terms Created", "TnC - Approved", "Agreement Stage", "Agreement Signed"].include?(response["applicationStatus"])
               "INPROGRESS"
             elsif response["applicationStatus"] == "Disbursed"
               "DISBURSED"
             elsif response["applicationStatus"] == "Application Rejected"
               "REJECTED"
             else
               "ERROR"
             end

    data.status = status
    data.rejection_reason = data.message = response["rejectionReasons"]&.first if response["rejectionReasons"].present?
    data.save
  end

  def base_url
    ENV.fetch("LENDINGKART_BASE_URL", nil)
  end

  def lead_creation_payload
    {
      firstName:         user.first_name,
      lastName:          user.last_name,
      email:             user.email.strip,
      mobile:            user.mobile,
      businessAge:       36,
      businessRevenue:   (user.monthly_income * 12).to_i,
      registeredAs:      "Proprietorship",
      personalDob:       user.dob.strftime("%Y-%m-%d"),
      personalPAN:       user.pan_number.upcase,
      gender:            user.gender.strip.upcase,
      cibilConsentForLK: true,
      personalAddress:   {pincode: user.home_pincode, address: user.home_address},
      businessRunBy:     "Self",
      loanAmount:        loan_amount(user.monthly_income),
      businessAddress:   {address: user.business_address, pincode: user.business_pincode},
      productCategory:   "Proprietorship",
      natureOfBusiness:  ["Retailer"],
      uniqueId:          user.id,
      otherFields:       {}
    }
  end

  def dedupe_payload
    {
      mobile: user.mobile,
      email:  user.email.strip
    }
  end

  def loan_amount(salary)
    case salary
    when 1..24_999
      25_000
    when 25_000..40_000
      50_000
    when 40_001..50_000
      75_000
    when 50_001..75_000
      100_000
    when 75_001..100_000
      125_000
    when 100_001..125_000
      150_000
    when 125_001..150_000
      200_000
    when 150_001..200_000
      500_000
    else
      0.0
    end
  end

  def headers
    {
      "X-Api-Key":    ENV.fetch("LENDINGKART_API_KEY", nil),
      "Content-Type": "application/json",
      Accept:         "application/json"
    }
  end
end
