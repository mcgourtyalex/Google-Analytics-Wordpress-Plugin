$(document).ready(function ()
{
    $('#weekDiv').click(function ()
    {
        var $obj = $('#weekDiv .highlight > td').first();
        console.log($obj.contents().text());
        $('#pageSelector').val($obj.contents().text());
        change_page($obj.contents().text());
        $('#page_displayed').html($obj.contents().text() + " ");
        $('#overview').css("display", "inline");
    });

    $('#time_selector').change(function ()
    {
        var value = $("#time_selector").val();
        $('#numberOfDays').val(value);
        $('#slider').html(" " + value + " days");
        change_days(value);
    });

    $('#time_range').change(function ()
    {
        var value = $("#time_range").val();
        $('#numberOfDays').val(value);
        $('#slider').html(" " + value + " days");
        change_days(value);
    });
});
