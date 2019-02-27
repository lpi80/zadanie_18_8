App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    getGif: function (searchingText) {  // 1.
        return new Promise(
            (resolve, reject) => {
                const GIPHY_API_URL = 'https://api.giphy.com';
                const GIPHY_PUB_KEY = 'WeSEj6JNhkClAWA423VwHpMF8NzRHxHg';
                const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
                const xhr = new XMLHttpRequest();  // 3.
                xhr.open('GET', url);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText).data; // 4.
                        const gif = {  // 5.
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);  // 6.
                    }
                    else {
                        reject(new Error(xhr.status))
                    }
                };
                xhr.send();
            });
    },

    handleKeyUp: function (event) {
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.searchingText);
        }
    },

    handleSearch: function (searchingText) {  // 1.
        this.setState({
            loading: true  // 2.
        });
        
        this.getGif(searchingText)   // 3.
            .then(gif => 
            this.setState({  
                loading: false,  
                gif: gif,  
                searchingText: searchingText 
            }))
            .catch(error => console.log('Cos poszło nietak: ' + error))
             
    },

    render: function () {

        const styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});