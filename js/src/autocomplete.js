import instantsearch from 'instantsearch.js';
import { connectAutocomplete } from 'instantsearch.js/es/connectors';

export default connectAutocomplete(
	({ indices, refine, widgetParams }, isFirstRendering) => {
		// We get the onSelectChange callback from the widget params
		const { container, onSelectChange } = widgetParams;

		if (isFirstRendering) {
			container.html('<select id="ais-autocomplete"></select>');

			container.find('select').selectize({
				options: [],
				optgroups: indices.map((index, idx) => ({
					$order: idx,
					id: index.index,
					name: index.index
				})),
				labelField: 'name',
				valueField: 'name',
				searchField: 'name',
				optgroupField: 'section',
				optgroupLabelField: 'name',
				optgroupValueField: 'id',
				highlight: false,
				onType: refine,
				onChange(value) {
					onSelectChange(value);
					refine(value);
				},
				render: {
					option: hit => `
						<div class="hit">
							${instantsearch.highlight({ attribute: 'name', hit })}
						</div>
					`
				}
			});

			return;
		}

		const [select] = container.find('select');
		select.selectize.clearOptions();
		indices.forEach(index => {
			if (index.results) {
				index.results.hits.forEach(hit => {
					select.selectize.addOption(
						Object.assign({}, hit, {
							section: index.index
						})
					)
				})
			}
		});
		select.selectize.refreshOptions(select.selectize.isOpen);
	}
);