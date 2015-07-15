Template.statsPage.helpers({
    "weightsChart": function() {
        var spevs = ParticipantCounts.find({}).fetch();
        // one spev = {_id: "KASb7cB9M56jPcsfF",
        // participant_count: 6,
        // spev_id: "gCTjBiphgzfqB9SY2"
        // }
        var number_of_data_points = spevs.length;
        
        spevs.forEach(function(spev) {
            var s = Spevs.findOne({_id: spev.spev_id})
            spev.date = s.date; // add date
        })
        spevs = _.sortBy(spevs, "date");
        spevs.pop() // remove last spev, which is probably currently joinable
        var spev_data = new Array(number_of_data_points);
        spevs.forEach(function(spev, i) {
            spev_data[i] = [spev.date, spev.participant_count]
        })

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            legend: {
                enabled: false
            },
            title: {
                text: ""
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e of %b'
                }
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    enabled: false
                }
            },
            plotOptions: {
                line: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{y}',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                type: 'line',
                name: 'Participants',
                data: spev_data,
                pointStart: spev_data[0][0],
                pointInterval: 24 * 3600 * 1000 * 7 // 7 days
            }],
            credits: {
                enabled: false
            }
        };
    }
});