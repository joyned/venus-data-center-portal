import { useState } from "react";
import Grid from "../components/Grid";
import Panel from "../components/Panel";
import { ResponsiveTable, Table, TableBody, TableCell, TableHead, TableRow, TableTh } from "../components/Table";

export default function HomePage() {
    const [lastAccess, setLastAccess] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [dashboards, setDashboards] = useState<string[]>([]);
    const [connectors, setConnectors] = useState<string[]>([]);

    return (
        <Grid minMax="calc(100% / 3)">
            <Panel title="Last Access">
                <ResponsiveTable>
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
                </ResponsiveTable>
            </Panel>
            <Panel title="My Favorites">
                <ResponsiveTable>
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
                </ResponsiveTable>
            </Panel>
            <Panel title="My Dashboards">
                <ResponsiveTable>
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
                </ResponsiveTable>
            </Panel>
            <Panel title="My Connectors">
                <ResponsiveTable>
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
                </ResponsiveTable>
            </Panel>
        </Grid>
    )
}