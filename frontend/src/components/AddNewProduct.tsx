import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Input,
  Image,
  Box,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { Formik, Form, Field, type FieldProps } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object({
  image: Yup.mixed().required('Image is required'),
  name: Yup.string()
    .required('Product name is required')
    .min(2, 'Product name must be at least 2 characters'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be a positive number')
    .typeError('Price must be a number'),
});

interface AddProductDialogProps {
  onSubmit: (values: { image: string; name: string; price: number }) => void;
}

export function AddProductDialog({ onSubmit }: AddProductDialogProps) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <HStack wrap="wrap" gap="4">
      <Dialog.Root placement={'center'} motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Button variant="solid">Add New Product</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Add New Product</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Formik
                  initialValues={{
                    image: null as File | null,
                    name: '',
                    price: 0,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    const editedValues = {
                      name: values.name,
                      price: values.price,
                      image: values.image?.name as string,
                    };

                    onSubmit(editedValues);
                    setSubmitting(false);
                    resetForm();
                    setPreview(null);
                  }}>
                  {({ setFieldValue, isSubmitting, errors, touched }) => (
                    <Form>
                      <Field name="name">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            isInvalid={
                              !!(form.errors.name && form.touched.name)
                            }
                            mb={4}>
                            <FormLabel>Product Name</FormLabel>
                            <Input
                              {...field}
                              placeholder="Enter product name"
                            />
                            <FormErrorMessage>
                              {form.errors.name as string}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <FormControl
                        isInvalid={!!(errors.image && touched.image)}
                        mb={4}>
                        <FormLabel>Product Image</FormLabel>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0];
                            if (file) {
                              setFieldValue('image', file);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setPreview(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {preview && (
                          <Box mt={2}>
                            <Image src={preview} alt="Preview" maxH="150px" />
                          </Box>
                        )}
                        <FormErrorMessage>
                          {errors.image as string}
                        </FormErrorMessage>
                      </FormControl>

                      <Field name="price">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            isInvalid={
                              !!(form.errors.price && form.touched.price)
                            }
                            mb={4}>
                            <FormLabel>Price</FormLabel>
                            <Input
                              {...field}
                              type="number"
                              placeholder="Enter price"
                            />
                            <FormErrorMessage>
                              {form.errors.price as string}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                          <Button variant="outline" mr={3}>
                            Cancel
                          </Button>
                        </Dialog.ActionTrigger>
                        <Button
                          type="submit"
                          colorScheme="blue"
                          loading={isSubmitting}>
                          Add
                        </Button>
                      </Dialog.Footer>
                    </Form>
                  )}
                </Formik>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" position="absolute" right="4" top="4" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
}
