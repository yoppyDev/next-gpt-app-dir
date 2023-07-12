"use client"
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from "react";
import { Card, Grid, Container, Modal, TextInput, Button, Group } from '@mantine/core';
import supabase from '../lib/supabase';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

export type Room = {
  id: string;
  name: string;
};

export default function Page() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState('');
  const [system, setSystem] = useState('');
  const router = useRouter()

  useEffect(() => {
    (async() => {
      let { data: rooms } = await supabase
        .from('rooms')
        .select('id, name')
        .order('created_at');

        if (!rooms) {
          return [];
        }

        setRooms(rooms);

    })()

  }, []);


  const createRoome = ( async () => {
    const id = uuidv4();

    const { error } = await supabase
      .from('rooms')
      .insert({ id, name });

    if (error) {
      console.log(error);
    }

    await supabase
      .from('messages')
      .insert({ room_id: id, role: 'system', content: system });

    router.replace(`/rooms/${id}`)
  });

  const getRooms = ((rooms: Room[]) => {
    return rooms.map((room: Room, index: number) => (
      <Grid.Col key={index}>
        <Link href={`/rooms/${room.id}`} style={{ textDecoration: 'none' }}>
              <Card  shadow="sm" padding="lg" radius="md" withBorder
              >ルーム名： {room.name}
              </Card>
        </Link>
      </Grid.Col>
    ))
  })

  return (
    <div>
      <Container className='h-screen p-5'>
          <Grid className="w-[100%] mx-auto">
              <Grid.Col>
                <Card  shadow="sm" padding="lg" radius="md" withBorder onClick={open} className="cursor-pointer"
                >ルーム作成
                </Card>
              </Grid.Col>
              { getRooms(rooms) }
          </Grid>
      </Container>

      <Modal
        opened={opened}
        onClose={close}
        centered={true}
        withCloseButton={false}
      >
        <TextInput
          data-autofocus
          label="ルーム名"
          mt="md"
          onChange={(event) => setName(event.currentTarget.value)}
          value={name}
        />
        <TextInput
          data-autofocus
          label="AIアシスタントの設定"
          mt="md"
          onChange={(event) => setSystem(event.currentTarget.value)}
          value={system}
        />
        <Group
          position="center"
          mt="md"
        >
        <Button
          variant='light'
          onClick={createRoome}
        >
          作成
        </Button>
        </Group>
      </Modal>
    </div>
  );
}
