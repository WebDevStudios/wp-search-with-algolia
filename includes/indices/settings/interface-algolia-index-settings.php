<?php

interface Algolia_Index_Settings {
	public function set_index( Algolia_Index $index);
	public function get_index(): Algolia_Index;
	public function get_local_settings(): array;
	public function get_remote_settings(): array;
	public function get_settings_needs_sync(): array;
	public function push(): bool;
}
