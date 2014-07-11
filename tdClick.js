$(document).ready(function ()
{
    $('#weekDiv').click(function ()
    {
        var $obj = $('#weekDiv .highlight').first();
        console.log($obj.contents().html());
        $('#pageSelector').val($obj.contents().html());
    });

    $('#monthDiv').click(function ()
    {
        var $obj = $('#monthDiv .highlight').first();
        console.log($obj.contents().html());
        $('#pageSelector').val($obj.contents().html());
    });

    $('#yearDiv').click(function ()
    {
        var $obj = $('#yearDiv .highlight').first();
        console.log($obj.contents().html());
        $('#pageSelector').val($obj.contents().html());
    });
});
