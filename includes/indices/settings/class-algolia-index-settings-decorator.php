<?php

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchIndex;

class Algolia_Index_Settings_Decorator implements Algolia_Index_Settings {
	protected Algolia_Index_Settings $index_settings;

	public function __construct( Algolia_Index_Settings $index_settings ) {
		$this->index_settings = $index_settings;
	}

	public function get_index(): Algolia_Index {
		return $this->index_settings->get_index();
	}

	public function get_algolia_index(): SearchIndex {
		return $this->index_settings->get_algolia_index();
	}

	public function get_local_settings(): array {
		return $this->index_settings->get_local_settings();
	}

	public function get_remote_settings(): array {
		return $this->index_settings->get_remote_settings();
	}

	public function get_settings_needs_sync(): array {
		return $this->index_settings->get_settings_needs_sync();
	}

	public function push(): bool {
		return $this->index_settings->get_push();
	}
}
