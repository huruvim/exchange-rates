import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import {useExchange} from "../hooks/useExchange";
import {useMemo} from "react";
import {RowsI} from "../interfaces/exchanges";

const createData = (category: string, rate: number) => ({
  category,
  rate
});

const ExchangeTable = () => {
  const {data, onRefresh, isLoading} = useExchange();
  const rows: RowsI[] = useMemo(() => {
    if (data) {
      return Object.entries(data.exchange_rates).map(([category, rate]) => {
        return createData(category, rate);
      });
    }
    return [];
  }, [data]);

  if (isLoading) {
    return (
      <Box sx={{display: 'flex'}}>
        <CircularProgress/>
      </Box>
    )
  }
  return (
    <div style={{position: 'relative', width: '100%'}}>
      <Button onClick={onRefresh} style={{position: 'absolute', top: -40, right: -60, zIndex: 3}}>
        <RefreshIcon/>
      </Button>
      <Paper sx={{width: '100%', overflowY: 'hidden'}}>
        <TableContainer sx={{maxHeight: 'calc(100vh - 140px)'}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Currency</TableCell>
                <TableCell align="center">Rate($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.category}
                  sx={{'&:last-child td, &:last-child th': {border: 0}, '&:hover': {backgroundColor: '#cfcfcf'}}}
                >
                  <TableCell align="center" sx={{width: '50%'}} component="th" scope="row">
                    {row.category}
                  </TableCell>
                  <TableCell align="center" sx={{width: '50%'}}>{row.rate.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default ExchangeTable;
