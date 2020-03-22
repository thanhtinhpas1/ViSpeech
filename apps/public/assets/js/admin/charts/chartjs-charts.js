    /* ChartJS
     * -------
     * Here we will create a few charts using ChartJS
     */


    $(function() {


        /*---------------------
         ----- PIE CHART -----
         ---------------------*/
        if ($('#pieChart')[0]) {
            // Get context with jQuery - using jQuery's .get() method.
            var pieChartCanvas = $("#pieChart").get(0).getContext("2d");

            var config = {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [
                            11,
                            16,
                            7,
                            3,
                            14
                        ],
                        backgroundColor: [
                            "#FF6384",
                            "#4BC0C0",
                            "#FFCE56",
                            "#E7E9ED",
                            "#36A2EB"
                        ],
                        label: 'My dataset' // for legend
                    }],
                    labels: [
                        "USA",
                        "Germany",
                        "Austalia",
                        "Canada",
                        "France"
                    ]
                },
                options: {
                    responsive: true
                }
            };

            var myPie = new Chart(pieChartCanvas, config);

        }


        /*---------------------
         ----- DOUGHNUT CHART -----
         ---------------------*/
        if ($('#doughnutChart')[0]) {
            // Get context with jQuery - using jQuery's .get() method.
            var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");

            var config = {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [
                            11,
                            16,
                            7,
                            3,
                            14
                        ],
                        backgroundColor: [
                            "#FF6384",
                            "#4BC0C0",
                            "#FFCE56",
                            "#E7E9ED",
                            "#36A2EB"
                        ],
                        label: 'My dataset' // for legend


                    }],
                    labels: [
                        "USA",
                        "Germany",
                        "Austalia",
                        "Canada",
                        "France"
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false
                    }
                }
            };

            var myDoughnutChart = new Chart(doughnutChartCanvas, config);

        }


        /*---------------------
         ----- LINE CHART -----
         ---------------------*/

        //var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var config = {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: "#FF6384",
                    borderColor: "#FF6384",
                    data: [
                        45,
                        75,
                        26,
                        23,
                        60, -48, -9
                    ],
                    fill: false,
                }, {
                    label: "My Second dataset",
                    fill: false,
                    backgroundColor: "#36A2EB",
                    borderColor: "#36A2EB",
                    data: [-10,
                        16,
                        72,
                        93,
                        29, -74,
                        64
                    ],
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        };

        if ($('#lineChart')[0]) {
            var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
            var lineChart = new Chart(lineChartCanvas, config);

        }



        /*---------------------
         ----- AREA CHART -----
         ---------------------*/

        var config = {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: "#FF8A80",
                    borderColor: "#FF8A80",
                    data: [
                        45,
                        75,
                        26,
                        23,
                        60,
                        48,
                        9,
                        45,
                        75,
                        26,
                        23,
                        60,
                        48,
                        9
                    ],
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Area Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        };

        if ($('#areaChart')[0]) {

            // Get context with jQuery - using jQuery's .get() method.
            var areaChartCanvas = $("#areaChart").get(0).getContext("2d");

            //Create the line chart
            var areaChart = new Chart(areaChartCanvas, config);

        }


        /*---------------------
         ----- BAR CHART -----
         ---------------------*/


        var barChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: "#FF6384",
                borderColor: "#FF6384",
                borderWidth: 1,
                data: [
                    45,
                    75,
                    26,
                    23,
                    60, -48, -9
                ]
            }, {
                label: 'Dataset 2',
                backgroundColor: "#36A2EB",
                borderColor: "#36A2EB",
                borderWidth: 1,
                data: [-10,
                    16,
                    72,
                    93,
                    29, -74,
                    64
                ]
            }]

        };


        var config = {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart'
                }
            }
        }


        if ($('#barChart')[0]) {
            var barChartCanvas = $("#barChart").get(0).getContext("2d");
            var barChart = new Chart(barChartCanvas, config);

        }


        /*---------------------
         ----- BAR LINE COMBO CHART -----
         ---------------------*/


        var barlinecomboChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],

            datasets: [{
                type: 'line',
                label: 'Dataset 1',
                borderColor: "#4BC0C0",
                borderWidth: 2,
                fill: false,
                data: [-10,
                    16,
                    72,
                    93,
                    29, -74,
                    64
                ]
            }, {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: "#FF6384",
                data: [
                    45,
                    75,
                    26,
                    23,
                    60, -48, -9
                ],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: "#36A2EB",
                data: [-10,
                    16,
                    72,
                    93,
                    29, -74,
                    64
                ]
            }]

        };


        var config = {
            type: 'bar',
            data: barlinecomboChartData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart'
                }
            }
        }


        if ($('#barlinecomboChart')[0]) {
            var barlinecomboChartCanvas = $("#barlinecomboChart").get(0).getContext("2d");
            var barlinecomboChart = new Chart(barlinecomboChartCanvas, config);

        }

    });