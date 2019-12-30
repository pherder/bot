<?php

use BotMan\BotMan\Messages\Conversations\Conversation;
use BotMan\BotMan\Messages\Incoming\Answer;

class LetsPlayConversation extends Conversation
{
    protected $number;

    public function run()
    {
        $this->askNumber();
    }

    public function askNumber()
    {
        $this->ask('Wybierz jakąś liczbę od 1 do 100. Ale może być też inna...', function (Answer $answer) {

            $this->number = $answer->getText();
            $this->confirmNumber();
        });
    }

    public function confirmNumber()
    {
        sleep(1);
        $this->ask('Dziękuję. Czy wybrałeś liczbę ' . $this->number . '?', function (Answer $answer) {
            sleep(1);
            if ($answer->getText() == 'tak') {
                $this->say('Przegrałeś.');
            } elseif ($answer->getText() == 'nie') {
                $this->say('Oszust!!!');
            } else {
                $this->say('Nie wiem co o tym sądzić...');
            }
        });
    }
}
