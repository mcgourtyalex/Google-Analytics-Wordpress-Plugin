$(document).ready(function ()
{
    $('#weekDiv').click(function ()
    {
        var $obj = $('#weekDiv .gapi-analytics-data-chart-table-styles-tr-selected').first();
        console.log($obj.contents().html());
        $('#pageSelector').val($obj.contents().html());
    });

    $('#monthDiv').click(function ()
    {
        var $obj = $('#monthDiv .gapi-analytics-data-chart-table-styles-tr-selected').first();
        console.log($obj.contents().html());
        $('#pageSelector').val($obj.contents().html());
    });

    $('#yearDiv').click(function ()
    {
        var $obj = $('#yearDiv .gapi-analytics-data-chart-table-styles-tr-selected').first();
        console.log($obj.contents().html());
        $('#pageSelector').val($obj.contents().html());
    });
});
