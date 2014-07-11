$(document).ready(function ()
{
    $('#sele').click(function ()
    {
        var $obj = $('.gapi-analytics-data-chart-table-styles-tr-selected').first();
        console.log($obj.contents().html());
        $('#weekSelect').val($obj.contents().html());
    });
});
