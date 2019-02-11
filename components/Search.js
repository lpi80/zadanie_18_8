Search = React.createClass({
    getInitialState() {
        return {
            searchingText: ''
        };
    },

    handleChange: function (event) {
        const searchingText = event.target.value;
        this.setState({ searchingText: searchingText });

        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        }
    },

    render: function () {
        const styles = { fontSize: '1.5em', width: '90%', maxWidth: '350px' };

        return <input
            type="text"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            placeholder="Tutaj wpisz wyszukiwaną frazę"
            style={styles}
            value={this.state.searchTerm}
        />
    }
});