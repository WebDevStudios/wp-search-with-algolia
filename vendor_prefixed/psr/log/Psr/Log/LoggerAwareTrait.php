<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 30-October-2026 using {@see https://github.com/BrianHenryIE/strauss}.
 */

namespace WebDevStudios\WPSWA\Psr\Log;

/**
 * Basic Implementation of LoggerAwareInterface.
 */
trait LoggerAwareTrait
{
    /**
     * The logger instance.
     *
     * @var LoggerInterface|null
     */
    protected $logger;

    /**
     * Sets a logger.
     *
     * @param LoggerInterface $logger
     */
    public function setLogger(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }
}
