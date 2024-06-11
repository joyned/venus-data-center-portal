import { useEffect, useState } from "react";
import { useLoading } from "../components/Loading";
import Panel from "../components/Panel";
import UserModel from "../models/UserModel";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow, TableTh } from "../components/Table";
import Button from "../components/Button";

const dummyUsers: UserModel[] = [
    {
        id: 1,
        name: "John Doe",
        email: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
    }
]

export default function UserPage() {
    const navigate = useNavigate()
    const { setLoading } = useLoading();
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        setUsers(dummyUsers);
    }, []);

    return (
        <Panel title="Users">
            <span>Manage your users.</span>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableTh>User Name</TableTh>
                        <TableTh>Actions</TableTh>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && (
                        users.map((user) => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>
                                        <Button label="Edit" onClick={() => navigate(`/user/edit/${user.id}`)}></Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>
            <Button label="Add User"></Button>
        </Panel>
    )
}