$(document).ready(function ()
{
    $('#weekDiv').click(function ()
    {
        var $obj = $('#weekDiv .highlight > td').first();
        console.log($obj.contents().text());
        $('#pageSelector').val($obj.contents().text());
    });

    $('#monthDiv').click(function ()
    {
        var $obj = $('#monthDiv .highlight > td').first();
        console.log($obj.contents().text());
        $('#pageSelector').val($obj.contents().text());
    });

    $('#yearDiv').click(function ()
    {
        var $obj = $('#yearDiv .highlight > td').first();
        console.log($obj.contents().text());
        $('#pageSelector').val($obj.contents().text());
    });

    $('#time_selector').change(function ()
    {
        var value = $("#time_selector").val();
        $('#numberOfDays').val(value);
        change_days(value);
    });

    $('#time_range').change(function ()
    {
        var value = $("#time_range").val();
        $('#numberOfDays').val(value);
        change_days(value);
    });
});
