<?php

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

	public function get_local_settings(): array {
        return $this->get_index()->get_settings();
    }

	public function get_settings_needs_sync() {
        return [
            // TODO
        ];
    }

	public function push(): bool {
        return true; // TODO
    }
}