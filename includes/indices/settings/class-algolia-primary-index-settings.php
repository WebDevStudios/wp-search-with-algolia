<?php

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchIndex;

class Algolia_Primary_Index_Settings implements Algolia_Index_Settings {
	protected Algolia_Index $index;
	protected SearchIndex $algolia_index;

	public function __construct( Algolia_Index $index ) {
		$this->index = $index;
		$this->set_algolia_index();
	}

	public function get_index(): Algolia_Index {
		return $this->index;
	}

	public function get_algolia_index(): SearchIndex {
		return $this->algolia_index;
	}

	public function set_algolia_index(): void {
		$this->algolia_index = $this->get_index()->get_index();
	}

	public function get_local_settings(): array {
		return $this->get_index()->get_default_settings();
	}

	public function get_remote_settings(): array {
		if ( ! $this->get_index()->exists() ) {
			return [];
		}

		return $this->get_algolia_index()->getSettings();
	}

	public function get_settings_needs_sync(): array {
		$remote_settings = $this->get_remote_settings();

		$needs_sync = [];

		foreach ( $this->get_local_settings() as $key => $value ) {
			if ( ! array_key_exists( $key, $remote_settings ) || $remote_settings[ $key ] === null ) {
				$needs_sync[ $key ] = $value;
			}
		}

		return $needs_sync;
	}

	/**
	 * Push settings to the Algolia
	 *
	 * @param  array $overrides The settings array that will be forcefully pushed.
	 * @return bool
	 */
	public function push( $overrides = [] ): bool {
		$settings = wp_parse_args( $overrides, $this->get_settings_needs_sync() );

		if ( count( $settings ) === 0 ) {
			return false;
		}

		try {
			$this->get_algolia_index()->setSettings( $settings );
		} catch ( Exception $e ) {
			return false;
		}

		return true;
	}
}
