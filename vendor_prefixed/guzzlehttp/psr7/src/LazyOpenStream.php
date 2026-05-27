<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 27-May-2026 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

declare(strict_types=1);

namespace WebDevStudios\WPSWA\GuzzleHttp\Psr7;

use WebDevStudios\WPSWA\Psr\Http\Message\StreamInterface;

/**
 * Lazily reads or writes to a file that is opened only after an IO operation
 * take place on the stream.
 */
final class LazyOpenStream implements StreamInterface
{
    use StreamDecoratorTrait;

    /** @var string */
    private $filename;

    /** @var string */
    private $mode;

    /**
     * @var StreamInterface
     */
    private $stream;

    /**
     * @param string $filename File to lazily open
     * @param string $mode     fopen mode to use when opening the stream
     */
    public function __construct(string $filename, string $mode)
    {
        $this->filename = $filename;
        $this->mode = $mode;

        // unsetting the property forces the first access to go through
        // __get().
        unset($this->stream);
    }

    /**
     * Creates the underlying stream lazily when required.
     */
    protected function createStream(): StreamInterface
    {
        return Utils::streamFor(Utils::tryFopen($this->filename, $this->mode));
    }
}
