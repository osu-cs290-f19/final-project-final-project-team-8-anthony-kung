/**********************************************************
 * Summer Camp Management System                          *
 * File Name: app.js                                   *
 * Created by: Anthony Kung <hello@anthonykung.com>       *
 * Date: Nov 24, 2019                                     *
 **********************************************************/


app.use(express.static('html'));

app.get('*', function (req, res) {
});
 
app.listen(port, () => console.log('Example app listening on port ${port}!'));
