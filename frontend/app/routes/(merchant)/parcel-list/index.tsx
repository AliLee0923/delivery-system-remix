import {
    Container,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Stack,
} from '@chakra-ui/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import Layout from '~/components/Layout'
import { requireUserId } from '~/utils/session.server'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getParcels } from '~/utils/merchant/parcels'
import type { ApiErrorResponse, Parcel, Parcels } from '~/types'
import { useLoaderData } from '@remix-run/react'
import moment from 'moment'
import ParcelStatusBadge from '~/components/common/ParcelStatusBadge'

export const meta: MetaFunction = () => ({
    title: 'Pracel List',
})

type LoaderData = {
    error?: string
    parcels: Parcels | null
}
export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    const parcels = await getParcels(request)
    if (parcels && (parcels as ApiErrorResponse).message) {
        return {
            error: (parcels as ApiErrorResponse).message,
            parcels: null,
        } as LoaderData
    } else if (!parcels) {
        return {
            error: 'Something went wrong',
            parcels: null,
        } as LoaderData
    }
    return { parcels }
}

function ParcelList() {
    const { error, parcels } = useLoaderData<LoaderData>()
    return (
        <Layout>
            <Container maxW="container.xl" py="8">
                <Heading as="h2" size="lg">
                    Your all parcel
                </Heading>
                <TableContainer my={10}>
                    <Table size="lg">
                        <Thead bg="gray.100">
                            <Tr>
                                <Th>Action</Th>
                                <Th>Creation Date</Th>
                                <Th>Pickup Name</Th>
                                <Th>ID</Th>
                                <Th>Shop</Th>
                                <Th>Customer Details</Th>
                                <Th>Status</Th>
                                <Th>Payment Info</Th>
                                {/* <Th>More Info</Th> */}
                                <Th>Last Update</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {error ? (
                                <Tr>
                                    <Td colSpan={9}>
                                        <Text color="red.500">{error}</Text>
                                    </Td>
                                </Tr>
                            ) : null}
                            {parcels?.data.length ? (
                                parcels?.data.map((parcel) => (
                                    <ParcelTableTr
                                        key={parcel.id}
                                        parcel={parcel}
                                    />
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={9} textAlign="center">
                                        No parcel found
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
        </Layout>
    )
}

export function ParcelTableTr({ parcel }: { parcel: Parcel }) {
    return (
        <Tr>
            <Td>
                <Menu>
                    <MenuButton
                        as={Button}
                        colorScheme="primary"
                        variant="outline"
                    >
                        <Icon as={BsThreeDotsVertical} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem color="red.500">Delete</MenuItem>
                    </MenuList>
                </Menu>
            </Td>
            <Td>{moment(parcel.createdAt).format('LL')}</Td>
            <Td>{parcel.parcelPickUp?.name}</Td>
            <Td>
                <Stack>
                    <Text>
                        ID: <b>{parcel.parcelNumber.toUpperCase()}</b>
                    </Text>
                    <Text>Invoice: {parcel.customerParcelInvoiceId}</Text>
                </Stack>
            </Td>
            <Td>{parcel?.shop?.name}</Td>
            <Td>
                <Text>{parcel.customerName}</Text>
                <Text>{parcel.customerPhone}</Text>
                <Text>{parcel.customerAddress}</Text>
                <Text>{parcel?.parcelDeliveryArea?.district.name}</Text>
                <Text>{parcel?.parcelDeliveryArea?.name}</Text>
            </Td>
            <Td>
                <ParcelStatusBadge status={parcel.parcelStatus.name} />
            </Td>
            <Td>
                <Text>Tk. {parcel.parcelCashCollection} Cash Collection</Text>
                <Text>Tk. {parcel.parcelCharge} Charge</Text>
            </Td>
            {/* <Td>Regular Delivery</Td> */}
            <Td>{moment(parcel.updatedAt).format('LL')}</Td>
        </Tr>
    )
}

export default ParcelList