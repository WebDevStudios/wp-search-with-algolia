<?php
/**
 * PHP-DI definitions configuration file.
 *
 * If this gets too complex,
 * could be split into multiple config files,
 * read and merge them all together here.
 *
 * @link http://php-di.org/doc/php-definitions.html
 */

use function \WDS_WPSWA_Vendor\DI\{
	autowire,
	create,
	factory,
	get
};

use WDS_WPSWA_Vendor\Psr\Container\ContainerInterface;

use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Algolia;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\SearchClient;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Config\SearchConfig;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Http\Guzzle6HttpClient;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Http\HttpClientInterface;

use WebDevStudios\WPSWA\Services\Admin\Options;
use WebDevStudios\WPSWA\Services\Admin\Settings\AlgoliaSearchApiKey;
use WebDevStudios\WPSWA\Services\Admin\Settings\AlgoliaApiKey;
use WebDevStudios\WPSWA\Services\Admin\Settings\AlgoliaApplicationId;
use WebDevStudios\WPSWA\Services\Admin\Settings\AlgoliaIndexNamePrefix;
use WebDevStudios\WPSWA\Services\Admin\Settings\AlgoliaPoweredByEnabled;


use WebDevStudios\WPSWA\Services\LoadTextDomain;
use WebDevStudios\WPSWA\Services\Assets\Scripts\AlgoliaBundleScript;

use WebDevStudios\WPSWA\Factories\HttpClientFactory;
use WebDevStudios\WPSWA\Factories\SearchConfigFactory;
use WebDevStudios\WPSWA\Factories\SearchClientFactory;

use WebDevStudios\WPSWA\Utility\AlgoliaSettings;
use WebDevStudios\WPSWA\Utility\Requirements;

use WebDevStudios\WPSWA\CLI\AlgoliaCLI;
use WebDevStudios\WPSWA\CLI\Commands\CopyIndex;
use WebDevStudios\WPSWA\CLI\Commands\Hello;
use WebDevStudios\WPSWA\CLI\Commands\ListIndices;

/**
 * @return array PHP-DI configuration array.
 */
return [
	/**
	 * AlgoliaSettings.
	 */
	AlgoliaSettings::class         => autowire(),
	/**
	 * WPSWA Plugin services.
	 *
	 * Consider disconnecting Services from register_hooks.
	 * Possibly implement lazy instantiation through
	 *
	 * @see Plugin::set_services()
	 */
	'services'                     => [
		LoadTextDomain::class,
		Options::class,
		AlgoliaApplicationId::class,
		AlgoliaApiKey::class,
		AlgoliaSearchApiKey::class,
		AlgoliaIndexNamePrefix::class,
		AlgoliaPoweredByEnabled::class,
		AlgoliaBundleScript::class,
	],
	/**
	 * WPSWA WP-CLI commands.
	 *
	 * @see Plugin::set_cli_commands()
	 */
	'cli_commands'                 => [
		AlgoliaCLI::class,
		Hello::class,
		ListIndices::class,
		CopyIndex::class,
	],
	/**
	 * The HTTP Client for Algolia PHP SearchClient to use.
	 *
	 * The factory returns a Guzzle6HttpClient object that implements HttpClientInterface.
	 */
	HttpClientInterface::class     => factory(
		function ( ContainerInterface $c ) {
			return HttpClientFactory::create(
				[]
			);
		}
	),
	/**
	 * The Algolia SearchConfig for Algolia PHP SearchClient to use.
	 */
	SearchConfig::class            => factory(
		function ( ContainerInterface $c ) {
			return SearchConfigFactory::create(
				$c->get( AlgoliaSettings::class )
			);
		}
	),
	/**
	 * The Algolia PHP SearchClient.
	 */
	SearchClient::class            => factory(
		function ( ContainerInterface $c ) {
			return SearchClientFactory::create(
				$c->get( SearchConfig::class ),
				$c->get( HttpClientInterface::class )
			);
		}
	),
	/**
	 * Requirements checking.
	 */
	Requirements::class            => autowire()
		->constructor(
			get( AlgoliaSettings::class ),
			get( SearchClient::class )
		),
	/**
	 * The Algolia CLI command.
	 */
	AlgoliaCLI::class              => autowire(),
	/**
	 * The Algolia CLI Hello subcommand.
	 */
	Hello::class                   => autowire(),
	/**
	 * The Algolia CLI CopyIndex subcommand.
	 */
	CopyIndex::class               => autowire(),
	/**
	 * The Algolia CLI ListIndices subcommand.
	 */
	ListIndices::class             => autowire(),
	/**
	 * The Options page class.
	 */
	Options::class                 => autowire(),
	AlgoliaApplicationId::class    => autowire(),
	AlgoliaApiKey::class           => autowire(),
	AlgoliaSearchApiKey::class     => autowire(),
	AlgoliaIndexNamePrefix::class  => autowire(),
	AlgoliaPoweredByEnabled::class => autowire(),
];
