"use client"
import React from 'react'
import {
   Card,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Message } from '@/model/User'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'

type messageCardProps = {
   message: Message;
   onMessageDelete: (messageId: string) => void
}

function MessageCard({message, onMessageDelete}: messageCardProps) {
   const { toast } = useToast()
   const handleDeleteConfirm = async () => {
      console.log(message._id);
      
      const response = await axios.delete<ApiResponse>(`/api/deletemessage/${message._id}`)
      toast({
         title: response.data.message
      })
      onMessageDelete(message._id)
   }
  return (
    <Card className="flex items-center justify-between p-4">
      <div className="space-y-2">
        <CardHeader>
          <CardTitle>{message.content}</CardTitle>
        </CardHeader>
      </div>
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"destructive"}
              className="flex items-center justify-center w-10 h-10"
            >
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  </Card>  
  )
}

export default MessageCard