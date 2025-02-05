// import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

// function BarChart() {
//   console.log("jfjfj")
//   // console.log(labels, datas )
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div>
//       <Doughnut data={data} />
//     </div>
//   );
// }

// export default BarChart;

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function BarChart({labels, datas}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: datas,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(55, 59, 93, 0.2)', // Darker shade of red
          'rgba(64, 132, 236, 0.2)', // Darker shade of blue
          'rgba(195, 206, 88, 0.2)', // Darker shade of yellow
          'rgba(75, 162, 172, 0.2)', // Darker shade of cyan
          'rgba(133, 72, 185, 0.2)', // Darker shade of purple
          'rgba(189, 99, 69, 0.2)', // Darker shade of orange
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(55, 59, 93, 1)', // Darker shade of red
          'rgba(64, 132, 236, 1)', // Darker shade of blue
          'rgba(195, 206, 88, 1)', // Darker shade of yellow
          'rgba(75, 162, 172, 1)', // Darker shade of cyan
          'rgba(133, 72, 185, 1)', // Darker shade of purple
          'rgba(189, 99, 69, 1)', // Darker shade of orange
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut  data={data} />;
}

