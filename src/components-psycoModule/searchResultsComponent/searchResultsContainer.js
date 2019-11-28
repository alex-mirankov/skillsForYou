import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import searchResults from './searchResultsComponent'
import * as testsActions from '../../redux/actions/testsAction';

const mapStateToProps = (tests) => ({
    tests: tests.items
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(testsActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(searchResults);