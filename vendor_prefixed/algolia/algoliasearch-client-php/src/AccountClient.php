<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 23-February-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch;

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Exceptions\NotFoundException;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Response\MultiResponse;

final class AccountClient
{
    public static function copyIndex(SearchIndex $srcIndex, SearchIndex $destIndex, $requestOptions = [])
    {
        if ($srcIndex->getAppId() === $destIndex->getAppId()) {
            throw new \InvalidArgumentException('If both index are on the same app, please use SearchClient::copyIndex method instead.');
        }

        try {
            $destIndex->getSettings();

            throw new \InvalidArgumentException('Destination index already exists. Please delete it before copying index across applications.');
        } catch (NotFoundException $e) {
            // All good
        }

        $allResponses = [];

        $settings = $srcIndex->getSettings();
        $allResponses[] = $destIndex->setSettings($settings);

        $synonymsIterator = $srcIndex->browseSynonyms();
        $allResponses[] = $destIndex->saveSynonyms($synonymsIterator);

        $objectsIterator = $srcIndex->browseObjects();
        $allResponses[] = $destIndex->saveObjects($objectsIterator);

        $rulesIterator = $srcIndex->browseRules();
        $allResponses[] = $destIndex->saveRules($rulesIterator);

        return new MultiResponse($allResponses);
    }
}
