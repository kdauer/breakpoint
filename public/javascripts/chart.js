axios
  .get(`/spotlist/forecast/${location.pathname.split("/")[3]}`)
  .then(data => {
    var dataPack1 = data.data.chartMin;
    var dataPack2 = data.data.chartMax;
    var dates = data.data.convertTime;
    // Chart.defaults.global.elements.rectangle.backgroundColor = '#FF0000';
    var bar_ctx = document.getElementById("bar-chart");
    new Chart(bar_ctx, {
      type: "bar",
      data: {
        labels: dates,
        datasets: [
          {
            label: "min",
            data: dataPack1,
            backgroundColor: "rgba(0,0,205, 0.7)",
            hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
            hoverBorderWidth: 2,
            hoverBorderColor: "lightgrey",
            datalabels: {
              labels: {
                title: null
              }
            }
          },
          {
            label: "max",
            data: dataPack2,
            backgroundColor: "rgba(0,191,255, 0.7)",
            hoverBackgroundColor: "rgba(0,0,139, 0.7)",
            hoverBorderWidth: 2,
            hoverBorderColor: "lightgrey"
          }
        ]
      },
      options: {
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 0
          }
        },
        plugins: {
          datalabels: {
            labels: {
              title: {
                color: "black",
                anchor: "end",
                align: "top"
              }
            }
          }
        },
        animation: {
          duration: 10
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: { display: true },
              position: "top"
            }
          ],
          yAxes: [
            {
              stacked: true,
              gridLines: { display: false, zeroLine: false },
              ticks: {
                display: false,
                max: 18,
                min: 0,
                stepSize: 2
              }
            }
          ]
        }, // scales
        legend: { display: false, align: "start" }
      } // options
    });
    // console.log(data.data);
  });
