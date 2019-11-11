import { connect } from 'react-redux';
import * as variantActions from '../../redux/actions/createTestAction';
import { bindActionCreators } from 'redux';
import variantsInfo from './variantsInfoListComponent'

const mapStateToProps = ({ results }) => ({
  results: results.results,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(variantActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(variantsInfo);