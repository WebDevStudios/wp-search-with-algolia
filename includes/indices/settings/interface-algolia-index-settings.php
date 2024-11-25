<?php

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchIndex;

interface Algolia_Index_Settings {
	public function get_index(): Algolia_Index;
	public function get_local_settings(): array;
	public function get_remote_settings(): array;
	public function set_algolia_index(): void;
	public function get_algolia_index(): SearchIndex;
	public function get_settings_needs_sync(): array;
	public function push(): bool;
}
