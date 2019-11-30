import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import searchResults from './searchResultsComponent'
import * as testsActions from '../../redux/actions/testsAction';

const mapStateToProps = ({tests, user}) => ({
    tests: tests.items,
    userId: user.id,
    userAvatar: user.avatar,
    userEmail: user.email,
    userFullName: user.full_name,
    userTeacherStatus: user.is_teacher
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(testsActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(searchResults);