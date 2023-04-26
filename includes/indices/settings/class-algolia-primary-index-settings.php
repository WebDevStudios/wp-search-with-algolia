<?php

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchIndex;

class Algolia_Primary_Index_Settings implements Algolia_Index_Settings {
    protected Algolia_Index $index;

    public function __construct( Algolia_Index $index )
    {
        $this->set_index($index);
    }

    public function set_index(Algolia_Index $index ){
        $this->index = $index;
    }

	public function get_index(): Algolia_Index {
        return $this->index;
    }

    protected function get_algolia_index(): SearchIndex {
        return $this->get_index()->get_index();
    }

	public function get_local_settings(): array {
        return $this->get_index()->get_settings();
    }

    public function get_remote_settings(): array {
        if( ! $this->get_index()->exists() ) {
            return [];
        }

        return $this->get_algolia_index()->getSettings();
    }

	public function get_settings_needs_sync(): array {
        $remote_settings = $this->get_remote_settings();

        $needs_sync = [];

        foreach( $this->get_local_settings() as $key=>$value ) {
            if( ! array_key_exists( $key, $remote_settings ) || $remote_settings[$key] === null ) {
                $needs_sync[$key] = $value;
            }
        }

        return $needs_sync;
    }

	public function push(): bool {
        $settings_needs_sync = $this->get_settings_needs_sync();

        if( count( $settings_needs_sync ) === 0 ) {
            return false;
        }

        try {
            $this->get_algolia_index()->setSettings($settings_needs_sync);
        }catch(Exception $e) {
            return false;
        }

        return true;
    }
}