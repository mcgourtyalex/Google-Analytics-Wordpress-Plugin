// Query globals
    var viewSelectorQuery;
    var pageviewsQuery;
    // Resulting Query String
    var queryResults = "";
    // Current metric to report
    var currentMetric;

    gapi.analytics.ready(function ()
    {

        // Authorize (fetch client_id from options)

        var CLIENT_ID = parent.document.getElementById('client_id').innerHTML;

        gapi.analytics.auth.authorize({
            container: 'auth-button',
            clientid: CLIENT_ID
        });

        // View selectors (hidden)

        var viewSelectorWeek = new gapi.analytics.ViewSelector({
            container: 'viewSelectorWeek'
        });

        var viewSelectorMonth = new gapi.analytics.ViewSelector({
            container: 'viewSelectorMonth'
        });

        var viewSelectorYear = new gapi.analytics.ViewSelector({
            container: 'viewSelectorYear'
        });

        viewSelectorQuery = new gapi.analytics.ViewSelector({
            container: 'viewSelectorQuery'
        });

        // Timeline charts

        // Chart for last week
        var lastWeek = new gapi.analytics.googleCharts.DataChart({
            reportType: 'ga',
            query: {
                'dimensions': 'ga:pageTitle',
                'metrics': 'ga:pageviews',
                'start-date': '7daysAgo',
                'end-date': 'yesterday'
            },
            chart: {
                type: 'TABLE',
                container: 'tableWeek',
                options: {page: "enable", pageSize: 8, sort: "enable", width: 500, allowHTML: true}
            }
        });

        var lastWeekGraph = new gapi.analytics.googleCharts.DataChart({
            reportType: 'ga',
            query: {
                'dimensions': 'ga:date',
                'metrics': 'ga:pageviews',
                'start-date': '7daysAgo',
                'end-date': 'yesterday'
            },
            chart: {
                type: 'LINE',
                container: 'graphWeek',
            }
        });

        var lastWeekMap = new gapi.analytics.googleCharts.DataChart({
            reportType: 'ga',
            query: {
                'dimensions': 'ga:country',
                'metrics': 'ga:pageviews',
                'start-date': '7daysAgo',
                'end-date': 'yesterday'
            },
            chart: {
                type: 'GEO',
                container: 'mapWeek'
            }
        });

        // Chart for last month
        var lastMonth = new gapi.analytics.googleCharts.DataChart({
            reportType: 'ga',
            query: {
                'dimensions': 'ga:pageTitle',
                'metrics': 'ga:pageviews',
                'start-date': '30daysAgo',
                'end-date': 'yesterday'
            },
            chart: {
                type: 'TABLE',
                container: 'tableMonth',
                options: {page: "enable", pageSize: 8, sort: "enable", width: 500, allowHTML: true}
            }
        });

        var lastMonthGraph = new gapi.analytics.googleCharts.DataChart({
            reportType: 'ga',
            query: {
                'dimensions': 'ga:date',
                'metrics': 'ga:pageviews',
                'start-date': '30daysAgo',
                'end-date': 'yesterday'
            },
            chart: { type: 'LINE', container: 'graphMonth'}
        });

        // Chart for last year
        var lastYear = new gapi.analytics.googleCharts.DataChart({
            reportType: 'ga',
            query: {
                'dimensions': 'ga:pageTitle',
                'metrics': 'ga:pageviews',
                'start-date': '365daysAgo',
                'end-date': 'yesterday'
            },
            chart: { type: 'TABLE', container: 'tableYear', options: {page: "enable", pageSize: 8, sort: "enable", width: 500, allowHTML: true} }
        });

        var lastYearGraph = new gapi.analytics.googleCharts.DataChart({
            reportType: 'ga',
            query: {
                'dimensions': 'ga:yearMonth',
                'metrics': 'ga:pageviews',
                'start-date': '365daysAgo',
                'end-date': 'yesterday'
            },
            chart: {
                type: 'LINE',
                container: 'graphYear'
            }
        });


        // Connect components
        gapi.analytics.auth.on('success', function (response)
        {
            document.getElementById('auth-button').style.display = "none";
            viewSelectorWeek.execute();
            viewSelectorMonth.execute();
            viewSelectorYear.execute();
            viewSelectorQuery.execute();
        });

        // Create and change week selector
        viewSelectorWeek.on('change', function (ids)
        {
            var newIds = {
                query: {
                    ids: ids
                }
            }
            lastWeek.set(newIds).execute();
            lastWeekGraph.set(newIds).execute();
            lastWeekMap.set(newIds).execute();
        });

        // Create and change month selector
        viewSelectorMonth.on('change', function (ids)
        {
            var newIds = {
                query: {
                    ids: ids
                }
            }
            lastMonth.set(newIds).execute();
            lastMonthGraph.set(newIds).execute();
        });

        // Create and change year selector
        viewSelectorYear.on('change', function (ids)
        {
            var newIds = {
                query: {
                    ids: ids
                }
            }
            lastYear.set(newIds).execute();
            lastYearGraph.set(newIds).execute();
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
        return form.options[form.selectedIndex].text;
    }

    function getNumberOfDays() {
        return document.getElementById('numberOfDays').value;
    }

    function getMetric() {
        return getFormValue(document.getElementById('metric'));
    }

    function getPage() {
        var parentDoc = parent.document;
        var pageSelector = parentDoc.getElementById('pageSelector');
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