import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MuiTablePagination from "@material-ui/core/TablePagination";
import { withStyles } from "@material-ui/core/styles";
import ScrollContainer from 'react-indiana-drag-scroll'


const defaultFooterStyles = {
};

class CustomFooter extends React.Component {

  handleRowChange = event => {
    this.props.changeRowsPerPage(event.target.value);
  };

  handlePageChange = (_, page) => {
    this.props.changePage(page);
  };

  render() {
    const { count, classes, textLabels, rowsPerPage, page } = this.props;

    const footerStyle = {
      display:'flex', 
      justifyContent: 'flex-end',
      padding: '0px 24px 0px 24px'
    };

    return (
      <TableFooter>
        <TableRow>
          <TableCell style={footerStyle} colSpan={1000}>
            <ScrollContainer hideScrollbars={false} nativeMobileScroll={false} className="scroll-container">
                <MuiTablePagination
                component="div"
                style={{overflow: "unset"}}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={textLabels.rowsPerPage}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${textLabels.displayRows} ${count}`}
                backIconButtonProps={{
                    'aria-label': textLabels.previous,
                }}
                nextIconButtonProps={{
                    'aria-label': textLabels.next,
                }}
                rowsPerPageOptions={[10,20,100]}
                onChangePage={this.handlePageChange}
                onChangeRowsPerPage={this.handleRowChange}
                />
            </ScrollContainer>
          </TableCell>
        </TableRow>
      </TableFooter>
    );
  }

}

export default withStyles(defaultFooterStyles, { name: "CustomFooter" })(CustomFooter);