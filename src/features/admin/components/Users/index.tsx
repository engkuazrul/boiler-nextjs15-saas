import { getUsers } from "@/features/admin/actions/user";
import type { User } from "@prisma/client";
import UserEmptyState from "./user-empty-state";
import UserListTable from "./user-list-table";
import UserTopbar from "./user-topbar";

export const revalidate = 0;

export default async function UsersListContainer({ filter, search }: any) {
	let users = (await getUsers(filter)) as User[];

	if (search) {
		users = users?.filter((user) =>
			user?.email?.toLowerCase().includes(search?.toLowerCase())
		);
	}

	return (
		<>
			<div className='mb-5'>
				<UserTopbar />
			</div>
			{users?.length ? <UserListTable users={users} /> : <UserEmptyState />}
		</>
	);
}
