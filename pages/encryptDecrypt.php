<?php

    function encryptText($plainText, $method) {
        //Generates an initialization vector. Unsure how this is going to be transferred to the decrypt function.
        $iv = openssl_random_pseudo_bytes(16);
        return openssl_encrypt($plainText, $method, getPrivateKey(), $iv);
    }
?>