<?php

    //This works a bit weird, not recognized as a variable for the functions in THIS file, but works when included in other files
    //i.e. I cant have this here and then remove the $method parameter from the functions, which I think is odd but oh well
    $method = "aes-256-cbc";

    function getPrivateKey() {
        $file = fopen("privateKey.txt", "r") or die("File cannot be found!");
        $privateKey = fread($file, filesize("privateKey.txt"));
        fclose($file);

        return $privateKey;
    }

    //Function for encryption of plaintext. Supports two methods, AES-256-GCM and AES-256-CBC.
    function encryptText($plainText, $method) {

        //Switch case for the two block-cipher methods. Main difference code-wise is that GCM needs an authentication tag.
        switch ($method) {

            case "aes-256-gcm":
                //Generates an initialization vector. The length is based on the method used.
                $ivLen = openssl_cipher_iv_length($method);
                $iv = openssl_random_pseudo_bytes($ivLen);
                //Tag needed for AEAD-mode like GCM
                $tag = "";
                $cipherText = openssl_encrypt($plainText, $method, getPrivateKey(), 0, $iv, $tag);

                //Combines IV, tag and cipherText and encodes it.
                $combined = base64_encode($iv . $tag . $cipherText);
                break;
            
            case "aes-256-cbc":
                $ivLen = openssl_cipher_iv_length($method);
                $iv = openssl_random_pseudo_bytes($ivLen);

                $cipherText = openssl_encrypt($plainText, $method, getPrivateKey(), 0, $iv);

                //No tag needed here
                $combined = base64_encode($iv . $cipherText);
                break;
            
            default:
                //Technically an error message, since the method should be set to AES-256-CBC by default.
                echo "Please choose a valid block cipher. (How did you even manage to trigger this???)";
                $combined = "";
        }

        //Returns the combined string
        return $combined;
    }

    function decryptText($input, $method){

        switch ($method) {

            case "aes-256-gcm":
                //Decodes the string, allowing for separating with substr
                $ivLen = openssl_cipher_iv_length($method);
                $data = base64_decode($input);
                //Gets each individual part of the combined string after decoding
                $iv = substr($data, 0, $ivLen);
                $tag = substr($data, $ivLen, 16);
                $string = substr($data, $ivLen + 16);

                //Decrypts into original plaintext
                $plainText = openssl_decrypt($string, $method, getPrivateKey(), 0, $iv, $tag);
                break;

            case "aes-256-cbc":
                $ivLen = openssl_cipher_iv_length($method);
                $data = base64_decode($input);
                //No tag needed here
                $iv = substr($data, 0, $ivLen);
                $string = substr($data, $ivLen);

                $plainText = openssl_decrypt($string, $method, getPrivateKey(), 0, $iv);
                break;
            
            default:
                echo "what";
        }

        //Returns the plaintext
        return $plainText;
    }

    
?>