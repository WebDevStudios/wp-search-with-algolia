<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 30-October-2026 using {@see https://github.com/BrianHenryIE/strauss}.
 */

namespace WebDevStudios\WPSWA\Psr\Log;

/**
 * Describes a logger-aware instance.
 */
interface LoggerAwareInterface
{
    /**
     * Sets a logger instance on the object.
     *
     * @param LoggerInterface $logger
     *
     * @return void
     */
    public function setLogger(LoggerInterface $logger);
}
