using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chaperone_Driver_DriverId",
                table: "Chaperone");

            migrationBuilder.AddForeignKey(
                name: "FK_Chaperone_Driver_DriverId",
                table: "Chaperone",
                column: "DriverId",
                principalTable: "Driver",
                principalColumn: "DriverId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chaperone_Driver_DriverId",
                table: "Chaperone");

            migrationBuilder.AddForeignKey(
                name: "FK_Chaperone_Driver_DriverId",
                table: "Chaperone",
                column: "DriverId",
                principalTable: "Driver",
                principalColumn: "DriverId");
        }
    }
}
