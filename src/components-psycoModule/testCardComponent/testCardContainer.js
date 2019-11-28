import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import testCard from './testCardComponent'
import * as setPassingTestAct from '../../redux/actions/setPassingTestAction';
import * as setEditTest from '../../redux/actions/setEditTestAction';

const mapStateToProps = ({ tests, user }) => ({
  activePage: tests.activePage,
  testsList:tests.items,
  userTeacherStatus: user.is_teacher,
  userId: user.id,
  userEmail: user.email
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(setPassingTestAct, dispatch),
  ...bindActionCreators(setEditTest, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(testCard);