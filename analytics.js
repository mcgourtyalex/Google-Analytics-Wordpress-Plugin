// Query globals
    var viewSelectorQuery;
    var pageviewsQuery;
    // Resulting Query String
    var queryResults = "";
    // Current metric to report
    var currentMetric;

    var last;

    var viewSelector;
    var start_date = '7daysAgo';
    var end_date = 'yesterday';

    gapi.analytics.ready(function ()
    {

        // Authorize (fetch client_id from options)

        var CLIENT_ID = parent.document.getElementById('client_id').innerHTML;

        gapi.analytics.auth.authorize({
            container: 'auth-button',
            clientid: CLIENT_ID
        });

        // View selectors (hidden)

        viewSelector = new gapi.analytics.ViewSelector({
            container: 'viewSelector'
        });

        viewSelectorQuery = new gapi.analytics.ViewSelector({
            container: 'viewSelectorQuery'
        });

        // Timeline charts

        // Chart for last week
        data = new gapi.analytics.googleCharts.DataChart({
            reportType: 'ga',
            query: {
                'dimensions': 'ga:pageTitle',
                'metrics': 'ga:pageviews,ga:uniquePageviews',
                'start-date': start_date,
                'end-date': end_date
            },
            chart: {
                type: 'TABLE',
                container: 'table',
                options: { 
                    page: "enable", 
                    pageSize: 8, 
                    sort: "enable", 
                    allowHTML: true, 
                    cssClassNames: { 
                        oddTableRow: 'blue', 
                        tableRow: 'white', 
                        selectedTableRow: 'highlight', 
                        hoverTableRow: 'hover'
                    },
                    width: "100%"
                }
            }
        });

        var dataGraph = new gapi.analytics.googleCharts.DataChart({
            reportType: 'ga',
            query: {
                'dimensions': 'ga:date',
                'metrics': 'ga:pageviews,ga:uniquePageviews,ga:sessions,ga:bounces,ga:newUsers',
                'start-date': start_date,
                'end-date': end_date
            },
            chart: {
                type: 'LINE',
                container: 'graph',
                options: { 
                    curveType: 'function', 
                    colors: ['#965AFF', '#5262E8', '#55B6FF', '#5BFFA8', '#4FE8E3' ], 
                    legend: {position: 'top', alignment: 'center', }, 
                    explorer: {actions: ['dragToZoom', 'rightClickToReset'], },
                    animation: {duration: 1000, easing: 'out'},
                    backgroundColor: { fill:'transparent' },
                    width: "100%"
                }
            }
        });

        var dataMap = new gapi.analytics.googleCharts.DataChart({
            reportType: 'ga',
            query: {
                'dimensions': 'ga:country',
                'metrics': 'ga:pageviews',
                'start-date': start_date,
                'end-date': end_date
            },
            chart: {
                type: 'GEO',
                container: 'map',
                options: { 
                    colors: ['#965AFF', '#5262E8', '#55B6FF', '#5BFFA8', '#4FE8E3' ], 
                    animation: {duration: 1000, easing: 'in'},
                    backgroundColor: { fill:'transparent' },
                    width: "100%"
                }
            }
        });

        // Connect components
        gapi.analytics.auth.on('success', function (response)
        {
            document.getElementById('auth-button').style.display = "none";
            viewSelector.execute();
            viewSelectorQuery.execute();
        });

        // Create and change  selector
        viewSelector.on('change', function (ids)
        {
            var newIds = {
                query: {
                    ids: ids,
                    'start-date': start_date,
                    'end-date': end_date,
                }
            }
            data.set(newIds).execute();
            dataGraph.set(newIds).execute();
            dataMap.set(newIds).execute();
        });

        // Create data object to query by title names
        pageviewsQuery = new gapi.analytics.report.Data({
            query: {
                'metrics': 'ga:pageviews',
                'start-date': '365daysAgo'
            }
        });

        // If successful, send response object to console
        pageviewsQuery.on('success', function (response)
        {
            console.log(response);
            handleResults(response);
            reportResults();
        });

        // viewSelector for queries (hidden)
        viewSelectorQuery.on('change', function (ids)
        {
            var newIds = {
                query: {
                    ids: ids
                }
            }
            pageviewsQuery.set(newIds).execute();
        });
    });


    // Launch query with new parameters
    function launchQuery(page, number, metric) {
        queryReset();
        // default to last 7 days
        if (number == "") {
            number = 7;
        }
        // create page filter
        var filterPage = 'ga:pagetitle==' + page;
        // create new start date
        var numberOfDays = number + 'daysAgo';
        // update current metric
        currentMetric = "ga:" + metric;
        // add new query parameters
        var newFilter = {
            query: {filters: filterPage, metrics: currentMetric}
        };
        newFilter.query['start-date'] = numberOfDays;

        console.log(newFilter.query['start-date']);
        console.log(newFilter.query['filters']);
        console.log(newFilter.query['metrics']);

        // set parameters
        pageviewsQuery.set(newFilter);
        // execute
        pageviewsQuery.execute();
    }

    // Fetch names from WordPress PHP
    function aggregateQuery() {
        var number = getNumberOfDays();
        var metric = getMetric();
        var page = getPage();
        console.log(number);
        console.log(metric);
        console.log(page);
        launchQuery(page,number,metric);
    }

    function getFormValue(form) {
        return form.options[form.selectedIndex].value;
    }

    function getFormText(form) {
        return form.value;
    }

    function getNumberOfDays() {
        return document.getElementById('numberOfDays').value;
    }

    function getMetric() {
        return getFormValue(document.getElementById('metric'));
    }

    function getPage() {
        var pageSelector = document.getElementById('pageSelector');
        console.log("here lies: " + pageSelector);
        return getFormText(pageSelector);
    }

    function queryReset() {
        queryResults = "";
    }

    function getCurrentMetric() {
        return currentMetric;
    }

    function reportResults() {
        document.getElementById('queryAnswer').innerHTML = queryResults;
    }

    function handleResults(response) {
        var data = response.totalsForAllResults[getCurrentMetric()];
        if (data != undefined){
            queryResults = data;
        }
    }

    function change_days(days) {
        start_date = days + "daysAgo";
        console.log(start_date);
        viewSelector.execute();
    }