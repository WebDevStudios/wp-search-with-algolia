<?php

class Algolia_Replica_Index_Settings extends Algolia_Index_Settings_Decorator {
	protected Algolia_Index_Replica $replica;

	public function __construct( Algolia_Index_Settings $index_settings, $replica ) {
		parent::__construct( $index_settings );
		$this->replica = $replica;
	}

	public function get_local_settings(): array {
		$settings            = $this->index_settings->get_local_settings();
		$settings['ranking'] = $this->replica->get_ranking();

		return $settings;
	}

	protected function switch_algolia_index(): void {
		$primary_index      = $this->index_settings->get_index();
		$client             = $primary_index->get_client();
		$replica_index_name = $this->replica->get_replica_index_name( $primary_index );
		$this->set_algolia_index( $client->initIndex( $replica_index_name ) );
	}

	public function push(): bool {
		$this->switch_algolia_index();
		return parent::push();
	}
}
