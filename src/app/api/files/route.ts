import { db as prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"

export async function GET() {
    console.log('chegou aqui na api')
    const user = await getCurrentUser()
    const userId = user?.id;

    try {
        // Buscar todos os arquivos associados ao usuário com o ID fornecido
        const userFiles = await prisma.file.findMany({
            where: {
                userId: userId
            }
        })

        // Verificar se o usuário possui arquivos
        if (!userFiles || userFiles.length === 0) {
            console.log('usuario sem arquivos')
            return NextResponse.json({ message: "Usuário não possui arquivos." }, { status: 404 })
        }

        // Retornar os arquivos associados a esse usuário
        return NextResponse.json(userFiles)
    } catch (error) {
        console.error("Erro ao buscar arquivos do usuário:", error)
        return NextResponse.json({ error: "Ocorreu um erro ao buscar os arquivos do usuário." }, { status: 500 })
    }
}
