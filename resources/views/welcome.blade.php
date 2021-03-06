<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel SPA</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
</head>
<body>
    <div id="app">
        <product-component></product-component>
        <vue-progress-bar></vue-progress-bar>
    </div>

<script src="{{asset('js/app.js')}}"></script>
</body>
</html>
