import { useState } from "react";
import Grid from "../components/Grid";
import Panel from "../components/Panel";
import { Table, TableBody, TableCell, TableHead, TableRow, TableTh } from "../components/Table";

export default function HomePage() {
    const [lastAccess, setLastAccess] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [dashboards, setDashboards] = useState<string[]>([]);
    const [connectors, setConnectors] = useState<string[]>([]);

    return (
        <Grid minMax="600px">
            <Panel title="Last Access">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableTh>Item</TableTh>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ cursor: 'pointer' }}>Dashboard 1</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Panel>
            <Panel title="My Favorites">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableTh>Item</TableTh>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ cursor: 'pointer' }}>Dashboard 1</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Panel>
            <Panel title="My Dashboards">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableTh>Item</TableTh>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ cursor: 'pointer' }}>Dashboard 1</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Panel>
            <Panel title="My Connectors">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableTh>Item</TableTh>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ cursor: 'pointer' }}>Connector 1</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Panel>
        </Grid>
    )
}