import type { ActionData } from '~/routes/shop-list/index'
import React from 'react'
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    Spinner,
} from '@chakra-ui/react'
import { Form, useTransition } from '@remix-run/react'

function AddShopDrawer({
    onClose,
    isOpen,
    actionData,
}: {
    onClose: () => void
    isOpen: boolean
    actionData: ActionData | undefined
}) {
    const formRef = React.useRef<HTMLFormElement>(null)
    const firstField = React.useRef<HTMLInputElement>(null)
    const transition = useTransition()
    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') === 'addShop'

    React.useEffect(() => {
        if (actionData?.formSuccess?.message.length) {
            formRef.current?.reset()
            onClose()
        }
    }, [actionData, onClose])
    return (
        <Drawer placement="right" size="lg" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <Form method="post" ref={formRef}>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Add new shop
                    </DrawerHeader>

                    <DrawerBody>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4">
                            <FormControl isRequired>
                                <FormLabel>Shop name</FormLabel>
                                <Input
                                    type="text"
                                    name="shopName"
                                    focusBorderColor="primary.500"
                                    ref={firstField}
                                    placeholder="Shop name"
                                />
                            </FormControl>

                            <FormControl
                                isInvalid={
                                    actionData?.fieldErrors?.shopEmail?.length
                                        ? true
                                        : false
                                }
                                isRequired
                            >
                                <FormLabel>Shop email</FormLabel>
                                <Input
                                    type="email"
                                    name="shopEmail"
                                    placeholder="Email address"
                                    focusBorderColor="primary.500"
                                    defaultValue={actionData?.fields?.shopEmail}
                                    aria-errormessage={
                                        actionData?.fieldErrors?.shopEmail
                                            ? 'email-error'
                                            : undefined
                                    }
                                />
                                <FormErrorMessage>
                                    {actionData?.fieldErrors?.shopEmail ? (
                                        <>{actionData.fieldErrors.shopEmail}</>
                                    ) : null}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Shop address</FormLabel>
                                <Input
                                    type="text"
                                    name="shopAddress"
                                    focusBorderColor="primary.500"
                                    placeholder="Shop address"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Pickup address</FormLabel>
                                <Input
                                    type="text"
                                    name="pickupAddress"
                                    focusBorderColor="primary.500"
                                    placeholder="Pickup address"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Pickup area</FormLabel>
                                <Input
                                    type="text"
                                    name="pickupArea"
                                    focusBorderColor="primary.500"
                                    placeholder="Pickup area"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Pickup phone</FormLabel>
                                <Input
                                    type="text"
                                    name="pickupPhone"
                                    focusBorderColor="primary.500"
                                    placeholder="Pickup phone"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Product Type</FormLabel>
                                <Select
                                    placeholder="Choose product type"
                                    name="productType"
                                    focusBorderColor="primary.500"
                                    defaultValue="book"
                                >
                                    <option value="book">Book</option>
                                    <option value="electronics">
                                        Electronics
                                    </option>
                                </Select>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Product Sub Category Type</FormLabel>
                                <Select
                                    placeholder="Choose sub Category type"
                                    name="subProductType"
                                    focusBorderColor="primary.500"
                                    defaultValue="history"
                                >
                                    <option value="history">History</option>
                                    <option value="computers">Computers</option>
                                </Select>
                            </FormControl>
                        </SimpleGrid>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={onClose}
                            type="reset"
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="primary"
                            type="submit"
                            name="_action"
                            value="addShop"
                        >
                            {isSubmitting ? <Spinner /> : 'Save'}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Form>
        </Drawer>
    )
}

export default AddShopDrawer
