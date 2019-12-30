<?php

require_once __DIR__ . '/vendor/autoload.php';

use BotMan\BotMan\BotMan;
use BotMan\BotMan\BotManFactory;
use BotMan\BotMan\Drivers\DriverManager;
use BotMan\Drivers\Web\WebDriver;
use BotMan\BotMan\Cache\SymfonyCache;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;


$config = [];

DriverManager::loadDriver(WebDriver::class);


$adapter = new FilesystemAdapter();
$makumBot = BotManFactory::create($config, new SymfonyCache($adapter));

$test = 0;


$makumBot->hears('witam', function ($bot) {
    $bot->typesAndWaits(1);
    $bot->reply('Ja również.<br> Wpisz <i>help</i>, aby dowiedzieć się czego można ode mnie oczekiwać.');
});

$makumBot->hears('help', function ($bot) {
    $bot->typesAndWaits(1);
    $bot->reply("Niczego. Ale wypróbuj chociaż opcję <i>zagrajmy</i>.");
});

$makumBot->hears('zagrajmy', function ($bot) {
    $bot->typesAndWaits(1);
    $bot->startConversation(new LetsPlayConversation);
});


$makumBot->fallback(function ($bot) {
    $bot->typesAndWaits(1);
    $bot->reply('Przepraszam, ja nie bardzo rozumieć...');
});

$makumBot->listen();
