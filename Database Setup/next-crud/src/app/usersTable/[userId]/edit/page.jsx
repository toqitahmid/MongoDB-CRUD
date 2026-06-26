import { updateUser } from "@/app/lib/actions";
import { getUserId } from "@/app/lib/data";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

const EditingPage = async ({ params }) => {
  const { userId } = await params;
  const user = await getUserId(userId);
  console.log(user);

  const updateUserWrapper = async(formData) => {
    'use server';
    return updateUser(userId, formData);
  }
  return (
    <div>
      <h1 className="text-center">Editing Page</h1>
      <Modal>
        <div className="flex items-center justify-center h-screen">
          <Button variant="secondary">Update</Button>
        </div>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Envelope className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Update User Info</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form action={updateUserWrapper} className="flex flex-col gap-4">
                    <TextField
                      className="w-full"
                      name="name"
                      type="text"
                      variant="secondary"
                      defaultValue={user.name}
                    >
                      <Label>Name</Label>
                      <Input placeholder="Enter your name" />
                    </TextField>
                    <TextField
                      className="w-full"
                      name="email"
                      type="email"
                      variant="secondary"
                      defaultValue={user.email}
                    >
                      <Label>Email</Label>
                      <Input placeholder="Enter your email" />
                    </TextField>
                    <TextField
                      className="w-full"
                      name="role"
                      type="text"
                      variant="secondary"
                      defaultValue={user.role}
                    >
                      <Label>Role</Label>
                      <Input placeholder="Enter User Role" />
                    </TextField>

                    <Modal.Footer>
                      <Button slot="close" variant="secondary">
                        Cancel
                      </Button>
                      <Button type="submit">Update</Button>
                    </Modal.Footer>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditingPage;
