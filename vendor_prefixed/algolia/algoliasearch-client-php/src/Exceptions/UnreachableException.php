<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 01-July-2025 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Exceptions;

final class UnreachableException extends AlgoliaException
{
    public function __construct($message = '', $code = 0, $previous = null)
    {
        if (!$message) {
            $message = 'Impossible to connect, please check your Algolia Application Id.';
        }

        parent::__construct($message, $code, $previous);
    }
}
