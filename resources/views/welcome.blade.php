<!doctype html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
       
    </head>
    <body>
       <h1>Hello World</h1>

       @can('view')
            <a href="href">View </a> <br/><br/>
       @endcan

       @can('edit')
            <a href="href">Edit the Form </a><br/><br/>
       @endcan

       @can('delete')
            <a href="href">Delete Record</a>
       @endcan
    </body>
</html>
